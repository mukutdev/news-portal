// variables
const cateGoryWrapper = document.getElementById('category-list')

// fetchingCategory list
const fetchingCategoryList = async () =>{
       try{
        const url = 'https://openapi.programming-hero.com/api/news/categories'
        const res = await fetch(url)
        const data = await res.json()
        displayCategoryList(data.data.news_category);
       }
       catch(err){
            console.log(err);
       } 
}
// displaying category list

const displayCategoryList =  (categories) =>{
        
        categories.forEach(category => {
        const {category_name : categoryName , category_id : id} = category
        const createLi = document.createElement('li')
        createLi.onclick = () => displayPost(id) 
        createLi.innerText = categoryName
        createLi.classList.add('list-group-item' , 'semibold-text')
        cateGoryWrapper.appendChild(createLi)
         
    })
}

// display post function 

const displayPost = async (id) => {
    
}

// calling function
fetchingCategoryList()