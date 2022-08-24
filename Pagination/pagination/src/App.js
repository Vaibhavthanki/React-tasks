import './App.css';
import axios from 'axios'
import React,{useState,useEffect} from 'react';
import Button from './Button';
function App() {
  const [value,setValue] = useState({});
  const [currentPage,setCurrentPage] = useState(1);
  
  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);  
  }

  useEffect( () => {
    axios.get(`https://jsonmock.hackerrank.com/api/articles?page=${currentPage}`)
    .then(y => {
      setValue(y.data);
    })
  },[value])

  const totalPagePost = value.per_page;
  const totalpost = value.total;

  return (
    <div className="App">
      {
        value?.data?.map((value) => {
          return(<div>
          <div>{value.author}</div>
          <div>{value.created_at}</div>
          </div>)
        })
      }
      <Button
      postPerPage={totalPagePost}
      totalPost={totalpost}
      paginate={paginate}
      />
    </div>
  );
}

export default App;
