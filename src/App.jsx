import { useCallback, useState, useEffect, useRef } from 'react'

import './App.css'

function App() {

  // useState
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("")

  // useRef
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "0123456789";
    }

    if (character) {
      str += "!@#$%^&*-_+=[]{}~`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, number, character, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  //useEffect 
  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])

  return (
    <>
      <div className='bg-green-300 w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 '>

        <h1 className='text-center font-bold text-2xl mb-4
        text-white'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='w-full px-4 py-3 text-lg outline-none text-slate-600 font-semibold'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          {/* copy button  */}
          <button
            className='outline-none bg-blue-600 text-white px-4 py-0.5 text-lg shrink-0'
            onClick={copyPasswordToClipboard}
          >copy</button>
        </div>

        {/* for length  */}
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='font-semibold text-sky-600'>Length: {length}</label>
          </div>

          {/* for number  */}
          <div className='flex item-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={number}
              id='numberInput'
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label className='font-semibold text-sky-600' htmlFor="numberInput">Numbers</label>
          </div>

          {/* for character  */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                setCharacter((prev) => !prev)
              }}
            />
            <label className='font-semibold text-sky-600' htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
