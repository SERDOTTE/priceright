export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[60vh] w-full">
            <div className="flex items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <svg
                    className="size-8 animate-spin text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    {/* Perfect circle track */}
                    <circle
                        className="opacity-20"
                        cx="12"
                        cy="12"
                        r="9.5"
                        stroke="currentColor"
                        strokeWidth="3"
                    ></circle>
                    {/* Perfect circle spinning segment */}
                    <path
                        className="opacity-90"
                        fill="currentColor"
                        d="M12 2.5a9.5 9.5 0 019.5 9.5h-3a6.5 6.5 0 00-6.5-6.5v-3z"
                    ></path>
                </svg>
            </div>
        </div>
    );
}