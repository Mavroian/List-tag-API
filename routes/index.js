const express = require('express');
const router = express.Router();
const axios = require('axios');
const {tags} = require('../config/variables')

function removeDuplicates(array) {
  return array.filter((a, b) => array.indexOf(a) === b)
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send( { title: 'Home' , tags:tags });
});
router.get('/:tag', async function(req, res, next) {
 
  const {tag} = req.params
  let towns = []
  let data = []
  const Headers ={
    headers: {
      Authorization: '41ef5680e2acd3ef9bc8b27051b3252eda695b7ad12829d2db05b3f707ee319f'
    },
  }
 try {
 await  axios.get(`https://regional-public-api-rw-prod.list-property.com/listing?tag[]=${tag.toUpperCase()}`, Headers)
  .then(res=> data = res.data.data).catch(res => console.log(res))
 } catch (error) {
   console.log(error)
 }
 towns = removeDuplicates(data.Property.map(listing =>  listing.Listing.Address.Town))
 

  res.send(
    { 
    title: `${tag.toUpperCase()}`,
    tags:tags ,
    towns:towns,
    data: data.Property
    }
  );
});
router.get('/:tag/:search', async function(req, res, next) {
  const searchFunctionality = (data, search) =>{
    return data.filter(listing => {
      return listing.Listing.Address.Town === search
    })
  }

  const {tag, search} = req.params
  
  let data = []
  const Headers ={
    headers: {
      Authorization: '41ef5680e2acd3ef9bc8b27051b3252eda695b7ad12829d2db05b3f707ee319f'
    },
  }
 try {
    await  axios.get(`https://regional-public-api-rw-prod.list-property.com/listing?tag[]=${tag.toUpperCase()}`, Headers)
    .then(result =>{
      data = searchFunctionality(result.data.data.Property, search)
        if(data.length === 0 ){
          data = 'sorry your search did not return any result'
        }
        return data
  }).catch(error => console.log(error))
 } catch (error) {
   console.log(error)
 }
 towns = data.map(listing => {
  return listing.Listing.Address.Town
})
towns = removeDuplicates(towns)
  res.send( { title: `${tag.toUpperCase()} : ${search}`,  towns:towns,  tags:tags , data: data});
});
module.exports = router;
