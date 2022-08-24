import { useReducer, useState } from 'react';
import './App.css';

function App() {
  

  const myreducer = (state,action) => {
    switch(action.type){
      case "add" : 
        return [...state,action.payload];
      /* case "delete":
        return state.filter((value,index) => {
          return index != action.payload
        }); */
      case "delete":
        let newData = [...state]
        newData.splice(action.payload,1);
        return newData;
      case "save":
        return state.map((value,myindex) => {
          if(myindex == action.index){
            return action.payload;
          }else {
            return value;
          }
        });
    }
  }
  const [data,setData] = useReducer(myreducer,[]);
  const [input,setInput] = useState({});
  const [index,setIndex] = useState(-1);
  const handleChange = (e) => {
    setInput({...input,[e.target.name] : e.target.value});
  }
  const submitData = (e) => { 
    if(index >= 0){
      setData({type:"save",payload: input , index: index})
    }
    else {
      setData({type:"add",payload:input})
    }
  }
  const editRow = (index) => {
    setInput(data[index]);
    setIndex(index);
  }
  const deleteRow = (index) => {
    setData({type:"delete",payload:index})
  }
  return (
    <div className="App mt-3">
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
              <div class="mb-3">
                <label for="formGroupExampleInput" class="form-label">Name</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Please enter name" name='userName' onChange={handleChange} value={input.userName}/>
              </div>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">Mobile Number</label>
                <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="Please enter mobile number" name='userMobileNumber' onChange={handleChange} value={input.userMobileNumber}/>
              </div>
              <div class="col-md-4">
                <label for="inputState" class="form-label">Type</label>
                <select id="inputState" class="form-select" name='saveType' onChange={handleChange} value={input.saveType}>
                  <option selected hidden>Please select type....</option>
                  <option  value="Home">Home</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              <div className='mt-3'>
                <button className='btn btn-primary' onClick={submitData}>Submit</button>
              </div>
          </div>
          <div className='col-12'>
            <table>
              <thead>
                <tr>
                  <th>
                    Name
                  </th>
                  <th>
                    MobileNumber
                  </th>
                  <th>
                    type
                  </th>
                </tr>
              </thead>
              <tbody>
                  {
                    data.map((value, index) => {
                      
                      return(
                      <tr>
                        <td>{value.userName}</td>
                        <td>{value.userMobileNumber}</td>
                        <td>{value.saveType}</td>
                        <td><button onClick={() => {editRow(index)}}>Edit</button></td>
                        <td><button onClick={() => {deleteRow(index)}}>Remove</button></td>
                      </tr>                      
                      )
                    })
                  }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
