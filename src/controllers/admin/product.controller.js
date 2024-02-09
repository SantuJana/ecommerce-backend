const paginate = require("express-paginate");
const ProductCategory = require("../../models/productCategory.model");

const list = async (req, res) => {
  res.render("pages/product/list", {
    success: req.flash("success"),
    error: req.flash("error"),
  });
};

const categoryList = async (req, res) => {
  const page = req?.query?.page || 1;
  const limit = req?.query?.limit || 10;
  const search = req?.query?.search || "";
  const status = req?.query?.status || "all";
  const sort = req?.query?.sort || "_id:-1";
  const sortColumn = sort.split(":")[0];
  const sortIndex = sort.split(":")[1];
  let [list, itemCount] = await Promise.all([
    ProductCategory.aggregate([
      {
        $match: {
          $and: [
            {
              $expr: {
                $regexMatch: {
                  input: "$name",
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
    ProductCategory.find({}).count(),
  ]);
  const pageCount = Math.ceil(itemCount / limit);
  res.render("pages/product/category/list", {
    list,
    page,
    limit,
    search,
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

const addEditCategory = async (req, res) => {
  const id = req?.body?.id;
  if (id && id !== "") {
    await ProductCategory.findByIdAndUpdate(id, req.body);
    req.flash("success", "Successfully updated");
  } else {
    req.body.slug = "";
    const category = new ProductCategory(req.body);
    await category.save();
    req.flash("success", "Successfully added");
  }
  res.redirect("/admin/product/category");
};

const deleteCategory = async (req, res) => {
  let ids = req?.body?.id?.split(",");
  await ProductCategory.deleteMany({
    _id: { $in: ids },
  });
  res.redirect("/admin/product/category");
};

const toggleCategoryStatus = async (req, res) => {
  let query = res.locals.query || "";
  let category = await ProductCategory.findById(req?.params?.id);
  category.status = category.status === "active" ? "inactive" : "active";
  await category.save();
  res.redirect("../" + query);
};

module.exports = {
  list,
  categoryList,
  addEditCategory,
  deleteCategory,
  toggleCategoryStatus,
};
