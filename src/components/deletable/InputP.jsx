const InputP = ({ type, name, label, placeholder, register }) => {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input type={type} name={name} placeholder={placeholder}  {...register}/>
    </div>
  );
};

export default InputP;
