export default function Container({children}) {
	return (
	  <div className='flex min-h-screen w-screen justify-center'>
		<div className='flex flex-col w-full items-center'>
		  {children}
		</div>
	  </div>
	)
  }