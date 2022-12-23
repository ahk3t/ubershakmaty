import React, {useEffect, useState} from "react"
import classes from "../../styles/pages/RegisterPage.module.css"
import pawnImage from "../../assets/chessFigures/pawn_black.png"
import knightImage from "../../assets/chessFigures/knight_black.png"
import queenImage from "../../assets/chessFigures/queen_black.png"
import kingImage from "../../assets/chessFigures/king_black.png"
import {requestAC, setErrorAC} from "../../reducers/requestReducer"
import {registerAC} from "../../reducers/authReducer"
import {useDispatch, useSelector} from "react-redux"

export default function RegisterPage() {
  const dispatch = useDispatch()
  const {isLoading, error} = useSelector((state) => state.requestReducer)
  const emptyCredentials = {
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  }
  const [credentials, setCredentials] = useState({...emptyCredentials})

  useEffect(() => {
    if (error) console.log(error)
  }, [error])

  function register() {
    if (credentials.password === credentials.confirmedPassword) {
      dispatch(requestAC(() => registerAC(credentials)))
    } else {
      dispatch(setErrorAC("Passwords do not match"))
    }
  }

  return (
    <main>
      <div className={classes.registerFormContainer}>
        <h1 className={classes.formTitle}>Присоединяйся</h1>
        <h2 className={classes.formTitle}>И начинай играть в шахматы!</h2>
        <div className={classes.formFields}>
          <div className={classes.formField}>
            <input
              type="text"
              placeholder="Имя"
              value={credentials.name}
              onChange={(event) =>
                setCredentials({...credentials, name: event.target.value})
              }
            />
          </div>
          <div className={classes.formField}>
            <input
              type="text"
              placeholder="Электронная почта"
              value={credentials.email}
              onChange={(event) =>
                setCredentials({...credentials, email: event.target.value})
              }
            />
          </div>
          <div className={classes.formField}>
            <input
              type="password"
              placeholder="Пароль"
              value={credentials.password}
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  password: event.target.value,
                })
              }
            />
          </div>
          <div className={classes.formField}>
            <input
              type="password"
              placeholder="Подтвердить пароль"
              value={credentials.confirmedPassword}
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  confirmedPassword: event.target.value,
                })
              }
            />
          </div>
        </div>
        <h2 className={classes.question}>Для всех уровней!</h2>
        <div className={classes.icon}>
          <div className={classes.level}>
            <img src={pawnImage} />
          </div>
          <div className={classes.level}>
            <img src={knightImage} />
          </div>
          <div className={classes.level}>
            <img src={kingImage} />
          </div>
          <div className={classes.level}>
            <img src={queenImage} />
          </div>
        </div>
        <div className={`${classes.icon} ${classes.iconWords}`}>
          <div className={classes.words}>Новичок</div>
          <div className={classes.words}>Начальный</div>
          <div className={classes.words}>Средний</div>
          <div className={classes.words}>PRO</div>
        </div>
        <button className={classes.button} onClick={register}>
          Зарегистрироваться
        </button>
        <div className={classes.divider}>или</div>
        <div className={classes.another}>
          <i className="bx bxl-google"></i>{" "}
          <a href="#" className={classes.register}>
            Зарегистрироваться с помощью Google{" "}
          </a>
        </div>
        <div className={classes.another}>
          <i className="bx bxl-apple"></i>{" "}
          <a href="#" className={classes.register}>
            Зарегистрироваться с помощью Apple{" "}
          </a>
        </div>
        <div className={classes.another}>
          <i className="bx bxl-facebook"></i>{" "}
          <a href="#" className={classes.register}>
            Зарегистрироваться с помощью Facebook{" "}
          </a>
        </div>
        <h2 className={classes.question}>
          <a href="#" className={classes.createOne}>
            Уже есть аккаунт?
          </a>
        </h2>
        <button className={classes.enterButton}>Войти</button>
      </div>
    </main>
  )
}