import { Link } from "react-router-dom";

const CartEmpty = () => {
	return (
		<div class="content">
			<div class="cart cart--empty">
				<h2>
					Корзина пустая <span>😕</span>
				</h2>
				<p>
					Вероятней всего, вы не заказывали ещё пиццу.
					<br />
					Для того, чтобы заказать пиццу, перейди на главную страницу.
				</p>
				<img src="img/empty-cart.png" alt="Empty cart" />
				<Link class="button button--black" to="/">
					<span>Вернуться назад</span>
				</Link>
			</div>
		</div>
	);
};

export default CartEmpty;
