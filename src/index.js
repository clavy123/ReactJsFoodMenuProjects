import {React,useState,useEffect,useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
function Clear(){
  const recipeList= useRef(null)
  const [lists, setlist] = useState(false)
  const [items,itemlist] = useState([])
  const apikey=process.env.REACT_APP_API_KEY;
  const apiid=process.env.REACT_APP_API_ID;
   useEffect(() => {
       recipeSearch("chicken")
   },[])
  function click(){
    const query=recipeList.current.value;
    recipeSearch(query)
  }
  function recipeSearch(query){
    setlist(true)
    let url=`https://api.edamam.com/search?q=${query}&app_id=${apiid}&app_key=${apikey}`;
    fetch(url).then(response=>{
        return response.json()
    }).then(res=>{
      console.log(res.hits)
      itemlist(res.hits)
      setlist(false)
    })
    .catch(err=>{
      console.log(err)
      setlist(false)
    })
   }
  return(
    <div className="header">
      <div className="container">
      <div className="input-tag">
        <input type="text" placeholder="Enter your query" ref={recipeList}/>
        <button onClick={click}>search</button>
      </div>
      {lists && <p>Laoding....</p>}
      <div className="dish">
        {items.map((item)=>{
          return(
            <div className="list">
              <span>{item.recipe.label}</span>
              <img src={item.recipe.image}/>
              <div className="recipe">
              {item.recipe.ingredientLines.map(step=>{
                   return <p>{step}</p>
              })}
              </div>
              </div>
      
          )
        })}
      </div>
      </div>
    </div>
  )
}
ReactDOM.render(
    <Clear />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
