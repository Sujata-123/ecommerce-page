import { useMemo, useState,useEffect } from 'react';

export async function getStaticProps() {
  // fetching all products from fakestoreapi
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  console.log("products",products)
  return {
    props: { products } // props will be passed to the page
  };
}


export default function Home({products}) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();
  const [prodList, setProdList] = useState([]);

  const handleSearch=(e)=>{
    const {value}=e.target
    setSearch(value)
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function getFilteredList() {
    if (!selectedCategory) {
      return prodList;
    }
    return products.filter((item) => item.category === selectedCategory);
  }
  getFilteredList()
  var filteredList = useMemo(getFilteredList, [selectedCategory, prodList]);

  useEffect(()=>{
    setProdList(products)
  },[])

  return (
    <div>

      <div className='flex justify-center items-center gap-3 relative'>
        <img src='https://i.pinimg.com/originals/61/58/82/61588210ffcb02408ae558b908fe8db5.jpg'
        className='w-full bg-cover sm:h-96 md:h-80'
        />
      <select
        name="category-list"
        className='absolute lg:left-[536px] lg:top-2 md:top-16 sm:top-24 bg-amber-600 text-white w-52 h-11 top-1'
        onChange={handleCategoryChange}
      >
         <option value="">All Category</option>
         <option value="men's clothing">men's clothing</option>
         <option value="jewelery">jewelery</option>
         <option value="electronics">electronics</option>
         <option value="women's clothing">women's clothing</option>
      </select>

      <div className='absolute lg:left-[825px] md:top-2 sm:top-8 top-14'>
      <input type="text" placeholder='Search this blog' onChange={handleSearch}
      value={search}
      className="w-52 h-11 p-3"
      />
      </div>
      <div className='absolute lg:bottom-20 md:bottom-20 sm:bottom-20 top-28'>
      <h1 className='text-center text-white  backdrop-blur-lg lg:text-5xl sm:text-base md:text-base'>GET START <br/>YOUR FAVRIOT SHOPING</h1>
      <div className='lg:pt-10 pt-2 flex justify-center'>
      <button className='bg-black text-white p-3 rounded-lg w-1/3'>BUY NOW</button>
      </div>
     </div>
      </div>

      <h1 className='text-4xl font-extrabold text-center pt-5'>Man & Woman Fashion</h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 sm:p-6 gap-4 max-w-[1200px] mx-auto pt-2 p-5'>
      {filteredList &&
       filteredList.filter((item) => {
          return search.toLowerCase() === ''
            ? item
            : item.title.toLowerCase().includes(search);
        }) 
      .map((post)=>{
        return(
          <div key={post.id} className='border-4 flex flex-col rounded-lg shadow-2xl'>
            <div className='flex flex-col justify-center items-center'>
          <span className='text-xl font-bold text-ellipsis overflow-hidden line-clamp-1 m-1'>{post.title}</span>
          <span className='text-lg font-medium'><span className=' text-orange-400'>Price</span>{` $ ${post.price}`}</span>
            </div>
          <img src={post.image}className="p-10"/>
          </div>
        )
      })}
      </div>
    </div>
  )
}

