// "use client";

// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { Control, FieldValues, Path } from "react-hook-form";

// import { CloseEyeIcon } from "../icons/close-eye";
// import { OpenEyeIcon } from "../icons/open-eye";
// import { FormInput } from "./form-input";

// interface Props<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label?: string;
//     className?: string;
//     labelClassName?: string;
//     errorClassName?: string;
//     containerClassName?: string;
// }

// export const FormPasswordInput = <T extends FieldValues>({
//     control,
//     name,
//     label,
//     className,
//     labelClassName,
//     errorClassName,
// }: Props<T>) => {
//     const tForm = useTranslations("form");

//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//     const togglePassword = () => setIsPasswordVisible((state) => !state);

//     const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;

//     return (
//         <div className="relative w-full">
//             <FormInput
//                 control={control}
//                 name={name}
//                 type={isPasswordVisible ? "text" : "password"}
//                 label={label}
//                 placeholder={tForm("password_placeholder")}
//                 className={className}
//                 labelClassName={labelClassName}
//                 errorClassName={errorClassName}
//             />
//             <Icon
//                 width={20}
//                 height={20}
//                 className="text-neutral hover:text-secondary_light absolute end-4 bottom-2.5 z-10 cursor-pointer"
//                 onClick={togglePassword}
//             />
//         </div>
//     );
// };

"use client";

// "use client";
// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { Control, FieldValues, Path } from "react-hook-form";
// import { CloseEyeIcon } from "../icons/close-eye";
// import { OpenEyeIcon } from "../icons/open-eye";
// import { FormInput } from "./form-input";
// interface Props<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label?: string;
//     className?: string;
//     labelClassName?: string;
//     errorClassName?: string;
//     containerClassName?: string;
// }
// export const FormPasswordInput = <T extends FieldValues>({
//     control,
//     name,
//     label,
//     className,
//     labelClassName,
//     errorClassName,
// }: Props<T>) => {
//     const tForm = useTranslations("form");
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//     const togglePassword = () => setIsPasswordVisible((state) => !state);
//     const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;
//     return (
//         <div className="relative w-full">
//             <FormInput
//                 control={control}
//                 name={name}
//                 type={isPasswordVisible ? "text" : "password"}
//                 label={label}
//                 placeholder={tForm("password_placeholder")}
//                 className={className}
//                 labelClassName={labelClassName}
//                 errorClassName={errorClassName}
//             />
//             <Icon
//                 width={20}
//                 height={20}
//                 className="text-neutral hover:text-secondary_light absolute end-4 bottom-2.5 z-10 cursor-pointer"
//                 onClick={togglePassword}
//             />
//         </div>
//     );
// };
// "use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { ErrorMessage } from "../core/error-message";
import { Input } from "../core/input";
import { Label } from "../core/label";
import { CloseEyeIcon } from "../icons/close-eye";
import { OpenEyeIcon } from "../icons/open-eye";
import { cn } from "../utils/class-names";
import { FormInput } from "./form-input";

// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { Control, FieldValues, Path } from "react-hook-form";
// import { CloseEyeIcon } from "../icons/close-eye";
// import { OpenEyeIcon } from "../icons/open-eye";
// import { FormInput } from "./form-input";
// interface Props<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label?: string;
//     className?: string;
//     labelClassName?: string;
//     errorClassName?: string;
//     containerClassName?: string;
// }
// export const FormPasswordInput = <T extends FieldValues>({
//     control,
//     name,
//     label,
//     className,
//     labelClassName,
//     errorClassName,
// }: Props<T>) => {
//     const tForm = useTranslations("form");
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//     const togglePassword = () => setIsPasswordVisible((state) => !state);
//     const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;
//     return (
//         <div className="relative w-full">
//             <FormInput
//                 control={control}
//                 name={name}
//                 type={isPasswordVisible ? "text" : "password"}
//                 label={label}
//                 placeholder={tForm("password_placeholder")}
//                 className={className}
//                 labelClassName={labelClassName}
//                 errorClassName={errorClassName}
//             />
//             <Icon
//                 width={20}
//                 height={20}
//                 className="text-neutral hover:text-secondary_light absolute end-4 bottom-2.5 z-10 cursor-pointer"
//                 onClick={togglePassword}
//             />
//         </div>
//     );
// };
// "use client";

// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { Control, FieldValues, Path } from "react-hook-form";
// import { CloseEyeIcon } from "../icons/close-eye";
// import { OpenEyeIcon } from "../icons/open-eye";
// import { FormInput } from "./form-input";
// interface Props<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label?: string;
//     className?: string;
//     labelClassName?: string;
//     errorClassName?: string;
//     containerClassName?: string;
// }
// export const FormPasswordInput = <T extends FieldValues>({
//     control,
//     name,
//     label,
//     className,
//     labelClassName,
//     errorClassName,
// }: Props<T>) => {
//     const tForm = useTranslations("form");
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//     const togglePassword = () => setIsPasswordVisible((state) => !state);
//     const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;
//     return (
//         <div className="relative w-full">
//             <FormInput
//                 control={control}
//                 name={name}
//                 type={isPasswordVisible ? "text" : "password"}
//                 label={label}
//                 placeholder={tForm("password_placeholder")}
//                 className={className}
//                 labelClassName={labelClassName}
//                 errorClassName={errorClassName}
//             />
//             <Icon
//                 width={20}
//                 height={20}
//                 className="text-neutral hover:text-secondary_light absolute end-4 bottom-2.5 z-10 cursor-pointer"
//                 onClick={togglePassword}
//             />
//         </div>
//     );
// };
// "use client";

// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { Control, FieldValues, Path } from "react-hook-form";
// import { CloseEyeIcon } from "../icons/close-eye";
// import { OpenEyeIcon } from "../icons/open-eye";
// import { FormInput } from "./form-input";
// interface Props<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label?: string;
//     className?: string;
//     labelClassName?: string;
//     errorClassName?: string;
//     containerClassName?: string;
// }
// export const FormPasswordInput = <T extends FieldValues>({
//     control,
//     name,
//     label,
//     className,
//     labelClassName,
//     errorClassName,
// }: Props<T>) => {
//     const tForm = useTranslations("form");
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//     const togglePassword = () => setIsPasswordVisible((state) => !state);
//     const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;
//     return (
//         <div className="relative w-full">
//             <FormInput
//                 control={control}
//                 name={name}
//                 type={isPasswordVisible ? "text" : "password"}
//                 label={label}
//                 placeholder={tForm("password_placeholder")}
//                 className={className}
//                 labelClassName={labelClassName}
//                 errorClassName={errorClassName}
//             />
//             <Icon
//                 width={20}
//                 height={20}
//                 className="text-neutral hover:text-secondary_light absolute end-4 bottom-2.5 z-10 cursor-pointer"
//                 onClick={togglePassword}
//             />
//         </div>
//     );
// };
// "use client";

// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { Control, FieldValues, Path } from "react-hook-form";
// import { CloseEyeIcon } from "../icons/close-eye";
// import { OpenEyeIcon } from "../icons/open-eye";
// import { FormInput } from "./form-input";
// interface Props<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label?: string;
//     className?: string;
//     labelClassName?: string;
//     errorClassName?: string;
//     containerClassName?: string;
// }
// export const FormPasswordInput = <T extends FieldValues>({
//     control,
//     name,
//     label,
//     className,
//     labelClassName,
//     errorClassName,
// }: Props<T>) => {
//     const tForm = useTranslations("form");
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//     const togglePassword = () => setIsPasswordVisible((state) => !state);
//     const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;
//     return (
//         <div className="relative w-full">
//             <FormInput
//                 control={control}
//                 name={name}
//                 type={isPasswordVisible ? "text" : "password"}
//                 label={label}
//                 placeholder={tForm("password_placeholder")}
//                 className={className}
//                 labelClassName={labelClassName}
//                 errorClassName={errorClassName}
//             />
//             <Icon
//                 width={20}
//                 height={20}
//                 className="text-neutral hover:text-secondary_light absolute end-4 bottom-2.5 z-10 cursor-pointer"
//                 onClick={togglePassword}
//             />
//         </div>
//     );
// };
// "use client";

// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { Control, FieldValues, Path } from "react-hook-form";
// import { CloseEyeIcon } from "../icons/close-eye";
// import { OpenEyeIcon } from "../icons/open-eye";
// import { FormInput } from "./form-input";
// interface Props<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label?: string;
//     className?: string;
//     labelClassName?: string;
//     errorClassName?: string;
//     containerClassName?: string;
// }
// export const FormPasswordInput = <T extends FieldValues>({
//     control,
//     name,
//     label,
//     className,
//     labelClassName,
//     errorClassName,
// }: Props<T>) => {
//     const tForm = useTranslations("form");
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//     const togglePassword = () => setIsPasswordVisible((state) => !state);
//     const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;
//     return (
//         <div className="relative w-full">
//             <FormInput
//                 control={control}
//                 name={name}
//                 type={isPasswordVisible ? "text" : "password"}
//                 label={label}
//                 placeholder={tForm("password_placeholder")}
//                 className={className}
//                 labelClassName={labelClassName}
//                 errorClassName={errorClassName}
//             />
//             <Icon
//                 width={20}
//                 height={20}
//                 className="text-neutral hover:text-secondary_light absolute end-4 bottom-2.5 z-10 cursor-pointer"
//                 onClick={togglePassword}
//             />
//         </div>
//     );
// };
// "use client";

// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { Control, FieldValues, Path } from "react-hook-form";
// import { CloseEyeIcon } from "../icons/close-eye";
// import { OpenEyeIcon } from "../icons/open-eye";
// import { FormInput } from "./form-input";
// interface Props<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label?: string;
//     className?: string;
//     labelClassName?: string;
//     errorClassName?: string;
//     containerClassName?: string;
// }
// export const FormPasswordInput = <T extends FieldValues>({
//     control,
//     name,
//     label,
//     className,
//     labelClassName,
//     errorClassName,
// }: Props<T>) => {
//     const tForm = useTranslations("form");
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//     const togglePassword = () => setIsPasswordVisible((state) => !state);
//     const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;
//     return (
//         <div className="relative w-full">
//             <FormInput
//                 control={control}
//                 name={name}
//                 type={isPasswordVisible ? "text" : "password"}
//                 label={label}
//                 placeholder={tForm("password_placeholder")}
//                 className={className}
//                 labelClassName={labelClassName}
//                 errorClassName={errorClassName}
//             />
//             <Icon
//                 width={20}
//                 height={20}
//                 className="text-neutral hover:text-secondary_light absolute end-4 bottom-2.5 z-10 cursor-pointer"
//                 onClick={togglePassword}
//             />
//         </div>
//     );
// };
// "use client";

// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { Control, FieldValues, Path } from "react-hook-form";
// import { CloseEyeIcon } from "../icons/close-eye";
// import { OpenEyeIcon } from "../icons/open-eye";
// import { FormInput } from "./form-input";
// interface Props<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label?: string;
//     className?: string;
//     labelClassName?: string;
//     errorClassName?: string;
//     containerClassName?: string;
// }
// export const FormPasswordInput = <T extends FieldValues>({
//     control,
//     name,
//     label,
//     className,
//     labelClassName,
//     errorClassName,
// }: Props<T>) => {
//     const tForm = useTranslations("form");
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//     const togglePassword = () => setIsPasswordVisible((state) => !state);
//     const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;
//     return (
//         <div className="relative w-full">
//             <FormInput
//                 control={control}
//                 name={name}
//                 type={isPasswordVisible ? "text" : "password"}
//                 label={label}
//                 placeholder={tForm("password_placeholder")}
//                 className={className}
//                 labelClassName={labelClassName}
//                 errorClassName={errorClassName}
//             />
//             <Icon
//                 width={20}
//                 height={20}
//                 className="text-neutral hover:text-secondary_light absolute end-4 bottom-2.5 z-10 cursor-pointer"
//                 onClick={togglePassword}
//             />
//         </div>
//     );
// };
// "use client";

// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { Control, FieldValues, Path } from "react-hook-form";

// import { CloseEyeIcon } from "../icons/close-eye";
// import { OpenEyeIcon } from "../icons/open-eye";
// import { FormInput } from "./form-input";

// interface Props<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label?: string;
//     className?: string;
//     labelClassName?: string;
//     errorClassName?: string;
//     containerClassName?: string;
// }

// export const FormPasswordInput = <T extends FieldValues>({
//     control,
//     name,
//     label,
//     className,
//     labelClassName,
//     errorClassName,
// }: Props<T>) => {
//     const tForm = useTranslations("form");

//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//     const togglePassword = () => setIsPasswordVisible((state) => !state);

//     const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;

//     return (
//         <div className="relative w-full">
//             <FormInput
//                 control={control}
//                 name={name}
//                 type={isPasswordVisible ? "text" : "password"}
//                 label={label}
//                 placeholder={tForm("password_placeholder")}
//                 className={className}
//                 labelClassName={labelClassName}
//                 errorClassName={errorClassName}
//             />
//             <Icon
//                 width={20}
//                 height={20}
//                 className="text-neutral hover:text-secondary_light absolute end-4 bottom-2.5 z-10 cursor-pointer"
//                 onClick={togglePassword}
//             />
//         </div>
//     );
// };

// "use client";

// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { Control, FieldValues, Path } from "react-hook-form";

// import { CloseEyeIcon } from "../icons/close-eye";
// import { OpenEyeIcon } from "../icons/open-eye";
// import { FormInput } from "./form-input";

// interface Props<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label?: string;
//     className?: string;
//     labelClassName?: string;
//     errorClassName?: string;
//     containerClassName?: string;
// }

// export const FormPasswordInput = <T extends FieldValues>({
//     control,
//     name,
//     label,
//     className,
//     labelClassName,
//     errorClassName,
// }: Props<T>) => {
//     const tForm = useTranslations("form");

//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//     const togglePassword = () => setIsPasswordVisible((state) => !state);

//     const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;

//     return (
//         <div className="relative w-full">
//             <FormInput
//                 control={control}
//                 name={name}
//                 type={isPasswordVisible ? "text" : "password"}
//                 label={label}
//                 placeholder={tForm("password_placeholder")}
//                 className={className}
//                 labelClassName={labelClassName}
//                 errorClassName={errorClassName}
//             />
//             <Icon
//                 width={20}
//                 height={20}
//                 className="text-neutral hover:text-secondary_light absolute end-4 bottom-2.5 z-10 cursor-pointer"
//                 onClick={togglePassword}
//             />
//         </div>
//     );
// };

// "use client";

// interface Props<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label?: string;
//     className?: string;
//     labelClassName?: string;
//     errorClassName?: string;
//     containerClassName?: string;
// }

// export const FormPasswordInput = <T extends FieldValues>({
//     control,
//     name,
//     label,
//     className,
//     labelClassName,
//     errorClassName,
// }: Props<T>) => {
//     const tForm = useTranslations("form");

//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//     const togglePassword = () => setIsPasswordVisible((state) => !state);

//     const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;

//     return (
//         <div className="relative w-full">
//             <FormInput
//                 control={control}
//                 name={name}
//                 type={isPasswordVisible ? "text" : "password"}
//                 label={label}
//                 placeholder={tForm("password_placeholder")}
//                 className={className}
//                 labelClassName={labelClassName}
//                 errorClassName={errorClassName}
//             />
//             <Icon
//                 width={20}
//                 height={20}
//                 className="text-neutral hover:text-secondary_light absolute end-4 bottom-2.5 z-10 cursor-pointer"
//                 onClick={togglePassword}
//             />
//         </div>
//     );
// };

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    type?: string;
    className?: string;
    labelClassName?: string;
    errorClassName?: string;
    containerClassName?: string;
}

export const FormPasswordInput = <T extends FieldValues>({
    name,
    control,
    label,
    className,
    labelClassName,
    errorClassName,
    containerClassName,
}: FormInputProps<T>) => {
    const tForm = useTranslations("form");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePassword = () => setIsPasswordVisible((state) => !state);

    const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;
    return (
        <div className={cn("relative flex w-full flex-col gap-1", containerClassName)}>
            {label && <Label className={labelClassName}>{label}</Label>}
            <div className="relative flex w-full flex-col gap-1">
                <Controller
                    name={name}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <Input
                                {...field}
                                id={name}
                                placeholder={tForm("password_placeholder")}
                                type={isPasswordVisible ? "text" : "password"}
                                className={className}
                                isError={!!error}
                            />
                            <ErrorMessage
                                message={error?.message}
                                className={cn("absolute top-full left-4 mt-px", errorClassName)}
                            />
                        </>
                    )}
                />

                <Icon
                    width={20}
                    height={20}
                    className="text-neutral hover:text-secondary_light absolute end-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                    onClick={togglePassword}
                />
            </div>
        </div>
    );
};
