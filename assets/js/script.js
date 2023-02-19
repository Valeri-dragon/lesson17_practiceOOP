'use strict'

const log = (x)=>{
  console.log(x)
}
const categoryForm = document.getElementById("category");
const nameCategory = categoryForm.elements.name_category;
const descripCategory = categoryForm.elements.description_category;
const btnAddCategory = categoryForm.elements.submit;
const categoryContainer = document.getElementById("category-container");
const selectCategory = document.getElementById("select_category");

const productsForm = document.getElementById('products')
const nameProducts = productsForm.elements.name_products
const descriptionProducts = productsForm.elements.description_products
const manufactureGoods = productsForm.elements.manufacture_products;
const articleProducts = productsForm.elements.article_products
const priceProducts = productsForm.elements.price_products
const btnAddProducts = productsForm.elements.submit_product
const productContainer = document.getElementById("product-container");

let categoryArr = localStorage.getItem("arr")
  ? JSON.parse(localStorage.getItem("arr"))
  : [];

let productsArr = localStorage.getItem("arrProduct")
  ? JSON.parse(localStorage.getItem("arrProduct"))
  : [];;
  
 class Category {
  constructor(name, description) {
    this._name = name;
    this._description = description;
  }
  get name(){
return this._name
  }
  get description(){
    return this._description
  }
  showCategory(){
      // log(`Category is ${this.name} description ${this.description}`);
      categoryContainer.innerHTML = "";
        selectCategory.innerHTML = "";
        categoryArr.forEach((item,index) => {
          log(item)
                     let option = document.createElement("option");
          option.textContent = item._name + ' ' + item._description;
          option.value = item._name;
          option.setAttribute("id", item._name);
          selectCategory.prepend(option);
          categoryContainer.insertAdjacentHTML(
            "beforeend",
            `
          <tr>
          <td>${index+1}</td>
          <td>${item._name}</td>
          <td>${item._description}</td></tr>
          `
          );
              }); 
  }
}
class Goods extends Category {
  constructor(nameCat, descrCat, name, description,manufacture, article, price) {
   
    super(name, description);
     this.nameCat = nameCat;
     this.descrCat = descrCat;
       this.manufacture = manufacture;
    this.article = article;
    this.price = price;
  }
  showProducts() {
productContainer.innerHTML = ''
productsArr.forEach((item, index)=>{
  log(item)
  productContainer.insertAdjacentHTML(
    "beforeend",
    `
  <tr>
  <td>${index + 1}</td>
  <td>${item.nameCat}</td>
  <td>${item.descrCat}</td>
  <td>${item._name}</td>
  <td>${item._description}</td>
  <td>${item.manufacture}</td>
  <td>${item.article}</td>
  <td>${item.price}</td>
   </tr>
  `
  );
})
  }
}

const trim = function (value) {
  return value.replace(/^\s+|\s+$/g, "");
};

let showCategory = new Category();
let showProducts = new Goods ()
btnAddCategory.addEventListener("click", (event)=>{
  event.preventDefault()
  
   let inputNameCategory = trim(nameCategory.value);
  let newDescripCategory = trim(descripCategory.value);
const  addingCategory = new Category(inputNameCategory, newDescripCategory);
    if (
    (inputNameCategory !== "" &&
      !Number(inputNameCategory))&&
      (newDescripCategory !== "" &&
      !Number(newDescripCategory))
    ) {
      categoryArr.push(addingCategory);
      nameCategory.value = "";
      descripCategory.value = "";
       localStorage.setItem("arr", JSON.stringify(categoryArr));
       showCategory.showCategory();
    }
    
})

btnAddProducts.addEventListener("click", (event) => {
  event.preventDefault();
  let categoryText =
    selectCategory.options[selectCategory.selectedIndex].textContent;
    let categoryValue =
      selectCategory[selectCategory.selectedIndex].id;
    log(categoryText);
    log(categoryValue);
  let inputNameProducts = trim(nameProducts.value);
  let newDescripProducts = trim(descriptionProducts.value);
  let manufacture = trim(manufactureGoods.value);
  let   article = articleProducts.value
 let price = priceProducts.value
   const addingProducts = new Goods(
     categoryValue,
     categoryText,
     inputNameProducts,
     newDescripProducts,
     manufacture,
     article,
     +price
   );
  if (
    inputNameProducts !== "" &&
    !Number(inputNameProducts) &&
    newDescripProducts !== "" &&
    !Number(manufacture) &&
    manufacture !== "" &&
    !Number(newDescripProducts) &&
    !isNaN(priceProducts.value)
  ) {
    productsArr.push(addingProducts);
    nameProducts.value = "";
    descriptionProducts.value = "";
    manufactureGoods.value=""
    articleProducts.value = "";
    priceProducts.value = "";
    localStorage.setItem("arrProduct", JSON.stringify(productsArr));
  }
  //show.showCategory();
});

showCategory.showCategory();
showProducts.showProducts();
//Category.showCategory();