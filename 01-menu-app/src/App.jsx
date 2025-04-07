import './App.css'
import items from './data.js'

function Card({ children }) {
  return (
    <div className='card'>
      {children}
    </div>
  )
}

function Menu({ item }) {
  return (
    <>
      <div className='img-container'>
        <img src={item.imgUrl} />
      </div>
      <div>
        {item.title}
        {item.isHot && '🌶️'}
        {item.isRecommended && <span>추천</span>}
      </div>
      <div className='price'>{item.price.toLocaleString()}원</div>
    </>
  )
}

function App() {
  return (
    <>
      <h1>메뉴판</h1>
      <div className="container">
        {items.map((item) =>
          <Card key={item.title}>
            <Menu item={item}></Menu>
          </Card>
        )}
      </div>
    </>
  )
}

export default App
