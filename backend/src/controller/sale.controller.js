const { request, response } = require("express");
const saleModel = require("../models/sale.model");

const createSale = async (req = request, res = response) => {
  const { date, amount, value, customer, product} = req.body;

  try {
    const numInvoice = await saleModel.count() + 1
    const invoiceNumber = numInvoice.toLocaleString(undefined, {useGrouping: false, minimumIntegerDigits: 4})

    const sale = new saleModel({
      invoiceNumber,
      date,
      amount,
      value,
      customer,
      product
    });
    await sale.save();
    res.status(201).json({ ok: true, status: 201, sale });
  } catch (error) {
    res.status(500).json({ ok: false, status: 500, message: error.message });
  }
};

const listSales = async (req = request, res = response) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const options = {
      limit,
      page,
      populate: ["customer", "product"]
    };
    const { docs: sales,...data } = await saleModel.paginate({},
      options
    );
    res.status(200).json({ ok: true, status: 200, sales, data });
  } catch (error) {
    res.status(500).json({ ok: false, status: 500, message: error.message });
  }
};

const deleteSale = async (req=request, res=response) => {
    try {
        const {id} = req.params
        const sale = await saleModel.findById({_id:id})
        if(!sale){
            return res.status(404).json({ok:false, status:400, message: "Sale not found"})
        }        
        await sale.deleteOne()
        res.status(200).json({ok:true, status:200, message: "Sale deleted"})
    } catch (error) {
        res.status(500).json({ok: false, status: 500, message: error.message})        
    }
}

const updateSale = async (req=request, res=response) => {
    const {invoiceNumber, date, customer, product, amount, value} = req.body
    const {id} = req.params

    try {
        const sale = await saleModel.findById({_id:id})

        sale.invoiceNumber = invoiceNumber || sale.invoiceNumber
        sale.date = date || sale.date
        sale.customer = customer || sale.customer
        sale.product = product || sale.product
        sale.amount = amount || sale.amount
        sale.value = value || sale.value

        await sale.save()
        res.status(200).json({ok:true, status:200, message: "Sale updated", sale})
        
    } catch (error) {
        res.status(500).json({ ok: false, status: 500, message: error.message });
    }
}

module.exports = {
  createSale,
  listSales,
  deleteSale,
  updateSale
};
