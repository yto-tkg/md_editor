import { BsChevronLeft } from 'react-icons/bs'

const Header = () => {
  return (
    <>
      <div className="pl-9 pt-9">
        <a
          href="/"
          className="flex items-center justify-center rounded-full transition duration-500 hover:bg-white hover:shadow-xl"
          style={{ width: '50px', height: '50px' }}
        >
          <BsChevronLeft style={{ fontSize: '30px', fontWeight: 'bold' }} />
        </a>
      </div>
    </>
  )
}

export default Header
