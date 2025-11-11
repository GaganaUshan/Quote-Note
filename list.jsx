const { useState, useEffect } = React;
const { ipcRenderer } = window.require('electron');

function List(){
  const [quotes, setQuotes] = useState(()=> JSON.parse(localStorage.getItem('qn_v3')||'[]'));

  useEffect(()=>{
    ipcRenderer.on('quotes-updated', (evt, data)=>{ if(Array.isArray(data)) setQuotes(data); });
    return ()=> ipcRenderer.removeAllListeners('quotes-updated');
  }, []);

  function toggleDisable(i){
    const copy = quotes.slice();
    copy[i].disabled = !copy[i].disabled;
    setQuotes(copy);
    localStorage.setItem('qn_v3', JSON.stringify(copy));
    ipcRenderer.send('sync-quotes', copy);
  }

  function del(i){
    const copy = quotes.slice();
    copy.splice(i,1);
    setQuotes(copy);
    localStorage.setItem('qn_v3', JSON.stringify(copy));
    ipcRenderer.send('sync-quotes', copy);
  }

  function closeWin(){ window.close(); }

  return (
    <div className="card">
      <div className="inner">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div className="title">Quote Note Version</div>
          <button className="back-btn" onClick={closeWin}>BACK</button>
        </div>

        <div style={{marginTop:10}} className="panel">
          {quotes.length===0 && <div>No quotes added yet.</div>}
          {quotes.map((q, idx)=> (
            <div key={idx} className="list-row" style={{marginBottom:8}}>
              <div style={{fontWeight:700}}>{q.text}</div>
              <div className="list-controls">
                <button className="pill-btn" onClick={()=>toggleDisable(idx)}>{q.disabled? 'EN' : 'DIS'}</button>
                <button className="pill-btn" onClick={()=>del(idx)}>DEL</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('list-root')).render(<List />);
