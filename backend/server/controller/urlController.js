const UrlModel = require("../model/urlSchema");

const createShortUrl = async (req, res) => {
  try {
    let {userId, long_url} = req.body
    if(!long_url) throw new Error('URL not found');
    let url = await UrlModel.findOne({long_url: long_url, user: userId}) 
    if(url){
      return res.status(400).json({error:"URL already exists"})
    }else{
      let short_url = Math.random().toString(36).slice(-6)
      const newUrl = new UrlModel({
        long_url: long_url,
        short_url: short_url,
        user: userId
      });
      const result = await newUrl.save();
      res.status(201).json({ message: "Short URL created successfully", short_url: result });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const redirectionToLongUrl = async (req, res) => {
  try {
    let short_url = req.params.shortUrlId;
    if(!short_url) throw new Error("URL not found")
    const result = await UrlModel.updateOne({short_url: short_url},{$inc:{visit: 1}});
    const url = await UrlModel.findOne({short_url: short_url})
    res.status(200).json({ message:"URL Found", long_Url: url.long_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUrl = async (req, res) => {
    try {
        let userId = req.params.userId
        if(!userId) throw new Error("User not found")
        let allUrl = await UrlModel.find({user:userId}).sort({priority:1})
        if(allUrl){
            res.status(200).json({urls:allUrl})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteUrl = async (req, res) => {
    try {
        let url = await UrlModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"URL deleted successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createShortUrl, redirectionToLongUrl, getAllUrl, deleteUrl };
