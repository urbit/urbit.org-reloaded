// Provides a limited-width column with all children center-aligned along the vertical axis
export default function SingleColumn({children}) {
	return (
	  <div className='flex flex-col w-full items-center max-w-screen-xl'>
		  {children}
	  </div>
	)
  }