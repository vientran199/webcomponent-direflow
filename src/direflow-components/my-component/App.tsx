import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { EventContext, Styled } from 'direflow-component';
import styles from './App.css';

interface IProps {
  componentTitle: string;
  sampleList: string[];
}

const App: FC<IProps> = (props) => {
  const dispatch = useContext(EventContext);
  const [value,setValue] = useState('')
  const inputRef = useRef<any>()
  useEffect(()=>{
    const customEvent = new CustomEvent('my-event-change',{detail:inputRef,bubbles:true})
    dispatch(customEvent)
  },[])
  const handleClick = () => {
    const event = new Event('my-event');
    dispatch(event);
  };

  const handleChange = (e:any)=>{
    const event = new CustomEvent('my-change',{detail: inputRef.current.value,bubbles:true})
    setValue(e.target.value)
    dispatch(event)
  }
  const renderSampleList = props.sampleList.map((sample: string) => (
    <div key={sample} className='sample-text'>
      → {sample}
    </div>
  ));

  return (
    <Styled styles={styles}>
      <div className='app'>
        <div className='top'>
          <div className='header-image' />
        </div>
        <div className='bottom'>
          <div className='header-title'>{props.componentTitle}</div>
          <div>{renderSampleList}</div>
          <input type='text' ref={inputRef} value={value} onChange={handleChange}></input>
          <button className='button' onClick={handleClick}>
            Click me!
          </button>
        </div>
      </div>
    </Styled>
  );
};

App.defaultProps = {
  componentTitle: 'My Component',
  sampleList: [
    'Create with React',
    'Build as Web Component',
    'Use it anywhere!',
  ],
}

export default App;
