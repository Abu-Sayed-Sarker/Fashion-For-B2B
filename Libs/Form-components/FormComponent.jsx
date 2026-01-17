import { Info } from "lucide-react";
import { Controller } from "react-hook-form";

// Reusable Input Component
export const Input = ({ label, name, register, errors, required = false, disabled = false, placeholder = '', helperText = '' }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, { required: required ? `${label} is required` : false })}
        className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none focus:ring-2 ${
          disabled ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'border-gray-300'
        } ${errors[name] ? 'border-red-300' : ''}`}
      />
      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      {errors[name] && <p className="text-xs text-red-600 mt-1">{errors[name].message}</p>}
    </div>
  );
};




// Reusable Select Component

export const Select = ({ 
  label, 
  name, 
  control, 
  errors, 
  options, 
  required = false, 
  disabled = false, 
  placeholder = 'Select...', 
  helperText = '',
  badge = null,
  highlighted = false,
  tooltip = null,
  onChange: customOnChange
}) => {
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2.5 transition-colors group-focus-within:text-blue-600">
        {label} 
        {required && <span className="text-rose-500 text-base">*</span>}
        {badge && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
            {badge}
          </span>
        )}
        {tooltip && (
          <div className="relative group/tooltip">
            <Info className="w-4 h-4 text-slate-400 hover:text-blue-500 cursor-help transition-colors" />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover/tooltip:block w-72 bg-slate-800 text-white text-xs rounded-xl p-4 z-10 shadow-2xl border border-slate-700 animate-in fade-in duration-200">
              <div className="absolute -bottom-1 left-3 w-2 h-2 bg-slate-800 border-r border-b border-slate-700 transform rotate-45"></div>
              {tooltip}
            </div>
          </div>
        )}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field }) => (
          <div className="relative">
            <select
              {...field}
              disabled={disabled}
              onChange={(e) => {
                field.onChange(e);
                if (customOnChange) customOnChange(e.target.value);
              }}
              className={`
                w-full px-4 py-3 text-sm font-medium rounded-lg
                appearance-none cursor-pointer
                transition-all duration-200 ease-in-out
                shadow-sm
                ${highlighted 
                  ? 'border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 text-amber-900 focus:border-amber-400 focus:ring-4 focus:ring-amber-100' 
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50'
                }
                ${disabled 
                  ? 'bg-slate-50 text-slate-500 cursor-not-allowed opacity-60' 
                  : 'hover:shadow-md'
                }
                ${errors[name] 
                  ? 'border-rose-400 bg-rose-50 focus:border-rose-500 focus:ring-rose-100' 
                  : ''
                }
              `}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23${errors[name] ? 'f43f5e' : highlighted ? 'f59e0b' : '475569'}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.25rem',
                paddingRight: '2.5rem', 
              }}
            >
              <option value="" className="text-slate-400">{placeholder}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value} className="text-slate-700 py-2">
                  {option.label}
                </option>
              ))}
            </select>
            {highlighted && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none mr-7">
                <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
              </div>
            )}
          </div>
        )}
      />
      {helperText && (
        <p className="text-xs text-slate-500 mt-2 flex items-start gap-1.5">
          <svg className="w-3.5 h-3.5 mt-0.5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {helperText}
        </p>
      )}
      {errors[name] && (
        <p className="text-xs text-rose-600 mt-2 flex items-center gap-1.5 font-medium animate-in slide-in-from-top-1 duration-200">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {errors[name].message}
        </p>
      )}
    </div>
  );
};