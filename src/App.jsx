import React, { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%&*()_+="

    for(let i = 1; i < length; i++){
      const char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [numberAllowed, charAllowed, length]);

  const copyPasswordToClipboard = ()=>{
    window.navigator.clipboard.writeText(password);
    passRef.current?.select() 
  }

  useEffect(()=>{
    generatePassword()
  },[length, charAllowed, numberAllowed])

  return (
    <div className='flex flex-wrap bg-black p-8 text-white h-screen w-full justify-center align-between'>
      <div className='flex flex-col text-white bg-gray-800 pd-5 w-250 rounded-4xl'>
        <h1 className='text-blue-300 text-center font-bold text-4xl p-15'>Password generator</h1>
        <div className='flex m-5'>
          <input type="text"
            value={password}
            placeholder='Password'
            className='bg-blue-100 outline-none w-full py-3 px-3 text-black rounded-lg'
            readOnly
            ref={passRef}>

          </input>
          <button className='rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700'
          onClick={copyPasswordToClipboard}>
            Copy</button>
        </div>
        <div className='flex item-center mt-3 py-3 gap-8 text-blue-50 justify-center align-middle'>
          <div className='flex gap-2'>
            <input
              type="range"
              min={6}
              max={100}
              className='cursor-pointer w-100'
              onChange={(e) => setLength(e.target.value)}
              value={length}
              />
            <label htmlFor='length'>Length :{length}</label>
          </div>
          <div className='flex gap-2 justify-center align-middle '>
            <input type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              name=""
              id=""
              className='border-0 h-5 w-5'
            />
            <label htmlFor='number'>Numbers</label>
          </div>
          <div className='flex gap-2 justify-center align-middle '>
            <input type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              name=""
              id=""
              className='border-0 h-5 w-5'
            />
            <label htmlFor='char'>Character</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App