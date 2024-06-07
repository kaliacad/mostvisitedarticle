import React from 'react';
/**
 * @typedef {Object} MenuItem
 * @property {string} value - The value of the menu item.
 * @property {string} [label] - The label of the menu item (optional, defaults to an empty string)..
 */

/**
 * Menu component.
 *
 * @param {Object} props - The properties object.
 * @param {MenuItem[]} props.data - The array of menu items.
 * @param {string} [props.label] - The label to display above the menu (optional, defaults to an empty string).
 * @param {string} [props.value] - The value to display (selected value)
 * @param {MenuItem} [props.defaultValue] - The default value of the menu item (optional, defaults to the first item).
 * @param {function(string) : void} props.onChange - The function to call when the menu item changes.
 *
 * @returns {JSX.Element} The rendered menu component.
 */
export const Menu = React.forwardRef(({ data, label, value, defaultValue, onChange }, ref) => {
    return (
        <div className='select_container'>
            <label htmlFor={`select_option${label}`} className='select_label'>
                {label}
            </label>
            <select
                ref={ref}
                id={`select_option${label}`}
                className='select_options'
                defaultValue={defaultValue ? defaultValue : data[0]}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {data.map((el, i) => (
                    <option key={i} value={el.value}>
                        {el.label ?? el.value}
                    </option>
                ))}
            </select>
        </div>
    );
});

Menu.displayName = 'Menu';
