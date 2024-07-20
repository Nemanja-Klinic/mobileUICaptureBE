const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kpiSchema = new Schema(
  {
    cellId: { type: Schema.Types.ObjectId, ref: "Cell", required: true },
    cell_name: { type: String, required: true },
    project_name: { type: String, required: true },
    task_name: { type: String, required: true },
    sguid: { type: String },
    time_cum: { type: Number },
    time_step: { type: Number },
    time: { type: Number },
    step: { type: Number },
    link: { type: String },
    action: { type: String },
    page_type: { type: String },
    search_query_text: { type: String },
    search_query_input: { type: String },
    search_type: { type: String },
    search_order: { type: String },
    menu_category: { type: String },
    filter_sort_category: { type: String },
    filter_sort_description: { type: String },
    category: { type: String },
    product_details: { type: String },
    product_name: { type: String },
    brand: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    other: { type: String },
    screenshot: { type: String },
  },
  { timestamps: true }
);

kpiSchema.virtual("row").get(function () {
  return this.constructor.countDocuments({
    cellId: this.cellId,
    createdAt: { $lte: this.createdAt }, // lte - less than equal to
  });
});

const KPI = mongoose.model("KPI", kpiSchema);

module.exports = KPI;
