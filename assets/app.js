// variables
const cateGoryWrapper = document.getElementById('category-list')
const newsWrapper = document.getElementById('news-wrapper')
const catCount = document.getElementById('cat-count')
const catName =document.getElementById('cat-name')
const newsDetailsDiv = document.getElementById('modal-div')


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

const displayCategoryList =  categories =>{
        
        categories.forEach(category => {
        const {category_name : categoryName , category_id : id} = category
        const createLi = document.createElement('li')
        createLi.onclick = () => fetchingCategoryPost(id ,categoryName) 
        createLi.innerText = categoryName
        createLi.classList.add('list-group-item' , 'semibold-text')
        cateGoryWrapper.appendChild(createLi)    
         
    })
    fetchingCategoryPost('08' , 'All News')
}

// fetchingCategory Post function 

const fetchingCategoryPost = async (id , categoryName) => {
    // show spinner
    toggleSpinner(true)
   
    try{ 
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`
        const res = await fetch(url)
        const data = await res.json()
         
        displayPost(data.data);
        catName.innerText = categoryName;
        catCount.innerText = data.data.length ? data.data.length : 'No post found ', toggleSpinner(false);
    }
    catch(err){
        console.log(err);
    }
}


//  displaying category post

const displayPost = posts =>{

    const defCoverImg = `https://placehold.jp/400x400.png`
    const defUserImg = `https://placehold.jp/150x150.png`
    // showing post in descending order
    
    posts.sort((a, b) => b.total_view - a.total_view)
    
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
            <p class="card-text py-2">${details.length > 250 ? details.slice(0 , 250) + '...' : details}</p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
              <div class="author-section d-flex align-items-center">
                  <div class="author-img">
                      <img src="${img ? img : defUserImg }" class=" rounded-circle border-0 user-image-circle" alt="">
                  </div>
                  <div class="author-meta ms-3">
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
                  <button onclick = targetSinglePost('${id}') data-bs-toggle="modal" data-bs-target="#newsModal" class="btn-common btn-bg rounded-2"> Read Post <i class="fa-solid fa-arrow-right ms-1"></i></button>
              </div>

          </div>
        </div>
      </div>
        `
        newsWrapper.appendChild(createNewsDiv)
        // hide spinner
        toggleSpinner(false)
      
    })
}

// TargetSinglePost

const targetSinglePost = async newsId =>{
    try{
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    const res = await fetch(url)
    const data = await res.json()
    displaySinglePost(data.data[0]);
    }
    catch(err){
        console.log(err);
    }
}

// displaySinglePost data

const displaySinglePost = post =>{
    const {title,total_view, author :{name, published_date, img},details,image_url,rating :{number},others_info :{is_todays_pick,is_trending}} = post
    console.log(post);
    newsDetailsDiv.innerHTML =` <div class="modal-content">
    <div class="modal-body">
      <img src="https://i.ibb.co/M23fhxm/unsplash-Eh-Tc-C9s-YXsw.png" class=" img-fluid" alt="">
       <h5 class="card-title fw-semibold py-3">Ukraine receives more military aid from allies on its independence day</h5>
       <div class="meta-info d-flex gap-2">
          <button class="btn-bg p-2  rounded-2"><i class="fa-solid fa-user text-white me-1"></i> ${name ? name : 'No name'}</button>
          <button class="btn-bg p-2 rounded-2">${is_trending === true && is_todays_pick === false ? is_trending.innerText='Trending' :is_todays_pick.innerText='Todays Pick' }</button>
          <button class="btn-bg p-2 rounded-2">${published_date ? published_date : 'No date found'}</button>
          <button class="btn-bg p-2 rounded-2"><i class="fa-sharp fa-solid fa-eye text-white"></i> ${total_view ? total_view : 'No view found'}</button>
       </div>
       <p class="card-text py-4"> 
        Wednesday, August 24, 2022 | Tag Cloud Tags: Biden, EU, Euro, Europe, Joe Biden, Military, News, Russia, Security, UK, Ukraine, United States, Worthy News (Worthy News) – U.S. President Joe Biden has announced nearly $3 billion in new U.S. military aid for Kyiv as Ukraine marked its independence day six months after Russia invaded the country.'The United States of America is committed to supporting the people of Ukraine as they continue the fight to defend their sovereignty. As part of that commitment, I am proud to announce our biggest tranche of security assistance to date: approximately $2.
       </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn-bg btn-common rounded-2" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
    
    
    `
}
//  spinner function

const toggleSpinner = isLoading =>{
    const spinner = document.getElementById('spinner')
    if(isLoading){
        spinner.classList.remove('d-none')
    }else{
        spinner.classList.add('d-none')
    }
}
// calling function
fetchingCategoryList()

