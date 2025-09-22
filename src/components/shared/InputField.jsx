import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const InputField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  //   value,
  placeholder,
  handleShowPassword,
  showPassword,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor="id"
        className={`${
          className ? className : ""
        } font-semibold text-sm text-slate-800`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`${
            className ? className : ""
          } w-full px-2 py-2 border outline-hidden bg-transparent text-slate-800 rounded-md ${
            errors[id]?.message ? "border-red-500" : "border-slate-700"
          }`}
          {...register(id, {
            required: { value: required, message },
            minLength: min
              ? { value: min, message: `Minimum ${min} character is required` }
              : null,
            pattern:
              type === "email"
                ? {
                    value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                    message: "Invalid email",
                  }
                : type === "url"
                ? {
                    value:
                      /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                    message: "Please enter a valid url",
                  }
                : null,
          })}
        />
        {label === "Password" && (
          <div
            className="absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} color="gray" />
            ) : (
              <AiFillEye size={20} color="gray" />
            )}
          </div>
        )}
      </div>

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-600 mt-0">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
