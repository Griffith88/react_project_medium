import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./charForm.scss";
import "../../style/style.scss";

const CharForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    navigate("/123");
    console.log(JSON.stringify(data));
  };

  return (
    <form className="char__form-search" onSubmit={handleSubmit(onSubmit)}>
      <label className="search__label" htmlFor="">
        Or find a character by name:
      </label>
      <div className="search__container">
        <input className="search__input" type="text" {...register("name")} placeholder="Enter name" />
        <button className="button button__main">
          <div className="inner">Find</div>
        </button>
      </div>
    </form>
  );
};

export default CharForm;
