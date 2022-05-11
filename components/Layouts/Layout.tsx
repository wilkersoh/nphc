import Header from 'components/Header'
import SiderBar from 'components/SiderBar';
import React from 'react'

interface ILayout {
  children?: JSX.Element;
  className?: string;
}

const Layout: React.FC<ILayout> = ({ className = "", children }) => {
  return (
    <div className={`flex flex-col mx-auto min-h-screen ${ className }`}>
      {/* <Header /> */}
      <section className='flex flex-1 px-4'>
        <SiderBar />
        <main className='w-full md:mx-8'>
          { children }
        </main>
      </section>
    </div>
  )
}

export default Layout