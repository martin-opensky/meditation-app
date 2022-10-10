export default function PauseIcon({ onClick }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width={1}
      stroke="currentColor"
      className="w-12 h-12 text-black-700 cursor-pointer hover:text-purple-600"
      onClick={onClick}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
