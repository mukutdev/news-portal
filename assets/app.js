// variables
const cateGoryWrapper = document.getElementById('category-list')
const newsWrapper = document.getElementById('news-wrapper')


const showDropdown = () =>
{
    dropdown.classList.toggle('showUl');
    rotate_i.classList.toggle('rotate_i');
}

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
        createLi.onclick = () => fetchingCategoryPost(id) 
        createLi.innerText = categoryName
        createLi.classList.add('list-group-item' , 'semibold-text')
        cateGoryWrapper.appendChild(createLi)
         
    })
}

// fetchingCategory Postfunction 

const fetchingCategoryPost = async (id) => {
    try{ 
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`
        const res = await fetch(url)
        const data = await res.json()
        displayPost(data.data);
    }
    catch(err){
        console.log(err);
    }
}


//  displaying category post

const displayPost = (posts) =>{

    // const points = [40, 100, 1, 5, 25, 10];
    // points.sort(function(a, b){return b - a});

    const defCoverImg = `https://placehold.jp/400x400.png`
    const defUserImg = `https://placehold.jp/150x150.png`

    //  console.log(posts.sort(function(a, b){

    //  }));
    posts.sort
    console.log(posts);
    newsWrapper.innerHTML = '';
    posts.forEach(post =>{

        const {_id : id ,image_url, title , details , author :{name ,published_date , img} , total_view} = post
        const createNewsDiv = document.createElement('div')
        createNewsDiv.classList.add('card' ,  'mb-3' , 'border-0' , 'shadow-sm' ,'rounded-3', 'p-4')
        createNewsDiv.innerHTML = ` <div class="row g-0 align-items-center">
        <div class="col-md-2">
          <img src="${image_url ? image_url : defCoverImg}" class="post-img rounded-3" alt="...">
        </div>
        <div class="col-md-10 py-4 px-5">
          <div class="card-body ">
            <h5 class="card-title fw-semibold">${title ? title : 'No title Found'}</h5>
            <p class="card-text">${details}</p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
              <div class="aurthor-section d-flex align-items-center">
                  <div class="aurthor-img">
                      <img src="${img ? img : defUserImg }" class=" rounded-circle border-0 user-image-circle" alt="">
                  </div>
                  <div class="aurthor-meta ms-3">
                      <h4 class="fs-6 fw-semibold">${name ? name : 'No name found'}</h4>
                      <h5 class="fs-6">${published_date ? published_date : 'No date found'}</h5>
                  </div>
              </div>
              <div class="post-view">
                  <i class="fa-sharp fa-solid fa-eye"></i>
                  <span class="ms-1 fw-semibold fs-5">${total_view ? total_view : 'No view found'}</span>
              </div>
              <div class="post-ratings">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-regular fa-star"></i>
              </div>
              <div class="post-details-btn">
                  <button onclick = displaySinglePost('${id}') class="btn-common btn-bg rounded-2"> Read Post <i class="fa-solid fa-arrow-right ms-1"></i></button>
              </div>

          </div>
        </div>
      </div>
        `
        newsWrapper.appendChild(createNewsDiv)
    })
}
// calling function
fetchingCategoryList()