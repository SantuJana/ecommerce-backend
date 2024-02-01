const paginate = require("express-paginate");
const CustomerModel = require("../../models/user.model");

const list = async (req, res) => {
  const page = req?.query?.page || 1;
  const limit = req?.query?.limit || 10;
  const search = req?.query?.search || "";
  const date = req?.query?.date || "";
  const status = req?.query?.status || "all";
  const sort = req?.query?.sort || "_id:-1";
  const sortColumn = sort.split(":")[0];
  const sortIndex = sort.split(":")[1];
  let [customerArray, itemCount] = await Promise.all([
    CustomerModel.aggregate([
      {
        $addFields: {
          fullName: {
            $concat: [
              { $ifNull: ["$firstName", ""] },
              " ",
              { $ifNull: ["$lastName", ""] },
            ],
          },
        },
      },
      {
        $match: {
          $and: [
            {
              $expr: {
                $regexMatch: {
                  input: "$fullName",
                  regex: search,
                  options: "i",
                },
              },
            },
            {
              status: {
                $in: status === "all" ? ["active", "inactive"] : [status],
              },
            },
          ],
        },
      },
      { $sort: { [sortColumn]: Number(sortIndex) } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]),
    CustomerModel.find({}).count(),
  ]);
  const pageCount = Math.ceil(itemCount / limit);
  res.render("pages/customer/list", {
    customers: customerArray,
    page,
    limit,
    search,
    date,
    status,
    pageCount,
    itemCount,
    pages: paginate.getArrayPages(req)(3, pageCount, page),
    sortColumn,
    sortIndex: sortIndex === "1" ? "-1" : "1",
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

const addEditCustomer = async (req, res) => {
  const id = req?.body?.id;
  if (id && id !== "") {
    delete req?.body?.password;
    await CustomerModel.findByIdAndUpdate(id, req.body);
    req.flash("success", "Successfully updated");
  } else {
    const customer = new CustomerModel(req.body);
    await customer.save();
    req.flash("success", "Successfully added");
  }
  res.redirect("/admin/customer");
};

const customerDetails = async (req, res) => {
  const customer = await CustomerModel.findById(req.params.customerId, {
    password: 0,
  });
  delete customer.password;
  return res.status(200).json(customer);
};

const toggleStatus = async (req, res) => {
  let query = res.locals.query || "";
  let customer = await CustomerModel.findById(req?.params?.id);
  customer.status = customer.status === "active" ? "inactive" : "active";
  await customer.save();
  res.redirect("../" + query);
};

const deleteCustomer = async (req, res) => {
  console.log("del: ", req?.body?.id);
  // await CustomerModel.findByIdAndDelete(req?.body?.id)
  res.redirect("/admin/customer");
};

module.exports = {
  list,
  addEditCustomer,
  toggleStatus,
  deleteCustomer,
  customerDetails,
};
