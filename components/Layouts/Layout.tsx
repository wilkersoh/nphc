import Header from 'components/Header'
import SiderBar from 'components/SiderBar';
import React from 'react'

interface ILayout {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<ILayout> = ({ className = "", children }) => {
  return (
    <div className={`flex flex-col mx-auto min-h-screen ${ className }`}>
      <Header />
      <section className='flex'>
        <SiderBar />
        <main>
          { children }
        </main>
      </section>
    </div>
  )
}

export default Layout