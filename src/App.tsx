import React, { useEffect, useState } from 'react';
import IUser from './models/IUser';
import './App.css';
import UserCard from './components/UserCard';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [page,setPage] = useState(1)
  const [load,setLoad] = useState('')  
  const [seed,setSeed] =useState('')
  const [prob, setProb] = useState(0)
  const [loc, setLoc] = useState('us')
  const url =`https://randomuser.me/api/?nat=${loc}&results=20${seed ? `&seed=${seed}` : ''}&page=${page}`
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    fetch(url)
    .then( response => response.json())
    .then( data => {
      setUsers(data.results)
      setSeed(data.info.seed)
    })
  },[load,loc,prob])



  function clickHandler(value:string) {
    setLoc(value)
  }  
      
  function numberHandler(value:number) {
    setProb(value)
  }

  async function fetchMoreData() {
    let url =`https://randomuser.me/api/?nat=${loc}&results=10${seed ? `&seed=${seed}` : ''}&page=${page+1}`
    setPage(page+1);
    await fetch(url)
    .then( response => response.json())
    .then( data => {
      setUsers((prev) => [...prev, ...data.results])
      setPage(page+1)
    })
  }
  
  return (
    <div className="App">
      <h1>Welcome to Random User app</h1>
      <div className='input-container'>
        <div className='input-group'>
            <select onChange={(e) => clickHandler(e.target.value)}>
              <option value={'us'}>USA</option>
              <option value={'ua'}>Ukraine</option>
              <option value={'tr'}>Turkey</option>
              <option>Any country</option>
          </select>
          <input type='number' defaultValue={0} step={0.1} onChange={e => numberHandler(Number(e.target.value))}/>
        </div>
        <div className='input-group'>
          <span className='seed'>seed:{seed}</span>
          <input type='text' placeholder='Enter your own seed' onChange={e => setSeed(e.target.value)} value={seed}/><button onClick={e => setLoad(seed)}>Set seed</button>
        </div>
      </div>
      <InfiniteScroll
        dataLength={users.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {
              <div className='usersContainer'>
                {users.map((user,index) => UserCard(user,prob,index))}
              </div>
        } catch (e) {
          
        }


      </InfiniteScroll>

    </div>
  );
}

export default App;
