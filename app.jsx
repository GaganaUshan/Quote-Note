const { useState, useEffect, useRef } = React;
const { ipcRenderer } = window.require('electron');

function App(){
  const [quotes, setQuotes] = useState(()=>{
    try{ const raw = localStorage.getItem('qn_v3'); return raw? JSON.parse(raw) : [
      {text: "Quote here", author: "-AUTHOR-", disabled:false}
    ]; }catch(e){ return [{text:"Quote here", author:"-AUTHOR-", disabled:false}]; }
  });
  const [current, setCurrent] = useState(0);
  const [intervalMin, setIntervalMin] = useState(()=> Number(localStorage.getItem('qn_interval')||30));
  const timerRef = useRef(null);

  useEffect(()=>{ localStorage.setItem('qn_v3', JSON.stringify(quotes)); }, [quotes]);
  useEffect(()=>{ localStorage.setItem('qn_interval', String(intervalMin)); resetTimer(); return ()=> clearInterval(timerRef.current); }, [intervalMin, quotes]);
  useEffect(()=>{ resetTimer(); return ()=> clearInterval(timerRef.current); }, []);

  useEffect(()=>{
    ipcRenderer.on('quotes-updated', (evt, data)=>{
      if(Array.isArray(data)) setQuotes(data);
    });
    ipcRenderer.on('settings-updated', (evt, data)=>{
      if(data.intervalMin) setIntervalMin(Number(data.intervalMin));
      if(typeof data.alwaysOnTop === 'boolean') ipcRenderer.send('update-settings', data);
    });
    return ()=>{ ipcRenderer.removeAllListeners('quotes-updated'); ipcRenderer.removeAllListeners('settings-updated'); };
  }, []);

  function resetTimer(){
    clearInterval(timerRef.current);
    timerRef.current = setInterval(()=>{
      // advance to next non-disabled quote
      if(quotes.length===0) return;
      let next = (current+1) % quotes.length;
      let safety=0;
      while(quotes[next] && quotes[next].disabled && safety<quotes.length){
        next = (next+1) % quotes.length; safety++;
      }
      setCurrent(next);
    }, Math.max(1, intervalMin) * 60 * 1000);
  }

  function openSettings(){ ipcRenderer.send('open-settings'); }
  function openList(){ ipcRenderer.send('open-list'); }

  const q = quotes.length? quotes[current%quotes.length] : {text:"No quotes", author:""};

  return (
    <div className="card">
      <div className="inner">
        <div className="top-row">
          <div className="title">Quote Note V1</div>
          <div className="icon-row">
            <div className="icon-btn" title="Settings" onClick={openSettings}>⚙️</div>
            <div className="icon-btn" title="Open list" onClick={openList}>☰</div>
            <div className="icon-btn close-icon" title="Close" onClick={()=>window.close()}>✕</div>
          </div>
        </div>

        <div className="quote-big">
          <div className="quote-text">{q.text}</div>
          <div className="quote-author">{q.author}</div>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{width:'70%'}} className="bottom-line"></div>
          <div style={{display:'flex', gap:10, alignItems:'center'}}>
            <button className="pill-btn" onClick={()=>{
              // manual next
              if(quotes.length>0) setCurrent((current+1)%quotes.length);
            }}>NEXT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
