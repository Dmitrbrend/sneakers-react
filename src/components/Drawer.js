
function Drawer({ onClose, onRemove, items = [] }) {

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина <img onClick={onClose} className="cu-p"
           src="/img/btn-remove.svg" alt="Remove" />
        </h2>


        {items.length > 0 ? (
            <div>
              <div className="items">
                {items.map((obj) => (
                  <div className="cartItem d-flex align-center mb-20">
                    <div
                      style={{ backgroundImage: `url(${obj.imagerUrl})` }}
                      className="cartItemImg"></div>

                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
                  </div>
                ))}
              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>21 498 руб. </b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 руб. </b>
                  </li>
                </ul>
                <button className="greenButton">
                  Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
          ) : (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="" />
              <h2>Корзина пуста</h2>
              <p class="opacity-6">Добате хотябы одну пару кроссовок, чтобы сделать закзаз.</p>
              <button onClick={onClose} className="greenButton">
                <img src="/img/arrow.svg" alt="" />
                Вернуться назад
              </button>
            </div>)
        }


      </div>
    </div>
  );
}

export default Drawer;