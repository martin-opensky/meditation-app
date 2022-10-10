export default function StopIcon({ onClick }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
      className="w-16 h-16 text-black-700 cursor-pointer hover:text-purple-600"
      onClick={onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
      />
    </svg>
  );
}
