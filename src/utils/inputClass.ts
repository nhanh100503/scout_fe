export function inputClass(error?: string) {
    return [
        "mt-1 w-full border rounded-md px-3 py-2",
        error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-500",
    ].join(" ");
}
