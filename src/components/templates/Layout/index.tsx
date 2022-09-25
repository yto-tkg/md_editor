import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="post-form min-h-screen">
        <div className="flex h-screen flex-col">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
