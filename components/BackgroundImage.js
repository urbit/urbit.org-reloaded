// Easily crops images
export default function BackgroundImage(props) {
  return (
	  <div className={`bg-img`} style={{backgroundImage: `url(${props.src})`}}/>
  )
}