import backgroundLight from "@/public/Background-Light.jpg";
import backgroundDark from "@/public/Background-Dark.jpg";

export default function BackgroundLogin({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="w-screen h-screen bg-cover bg-center flex justify-center items-center"
            style={{
                backgroundImage: `url(${backgroundDark.src})`,
            }}
        >
            {children}
        </div>
    );
}
