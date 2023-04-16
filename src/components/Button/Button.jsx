import css from 'components/Button/Button.module.css'

export const Button = ({ onClick }) => {
	return <button onClick={onClick} className={css.button}>Load more</button>
}
