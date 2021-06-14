export default function SingleColumn({children}) {
	return (
	  <div className='flex flex-col w-full items-center max-w-screen-xl'>
		  {children}
	  </div>
	)
  }