import { useReducer } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

const initialColor = { color: 'black' }

const reducer = (state, action) => {
  switch (action.type) {
    case 'light':
      return { color: 'white' }
    case 'dark':
      return { color: 'black' }
    case 'reset':
      return initialColor
  }
}

const Header = () => {
  const [state, dispatch] = useReducer(reducer, initialColor)

  return (
    <>
      <div className="pl-9 pt-9">
        <a
          href="/"
          className="flex items-center justify-center rounded-full transition duration-500 hover:bg-white hover:shadow-xl"
          style={{ width: '50px', height: '50px', backgroundColor: `${state.color}` }}
        >
          <BsChevronLeft style={{ fontSize: '30px', fontWeight: 'bold' }} />
        </a>
        <button onClick={() => dispatch({ type: 'reset', payload: initialColor })}>Reset</button>
        <button onClick={() => dispatch({ type: 'light' })}>🌅</button>
        <button onClick={() => dispatch({ type: 'dark' })}>🌙</button>
      </div>
    </>
  )
}

export default Header
