export default function Footer() {
    return (
        <footer className="bg-transparent text-center py-4 mt-auto">
            <small className="text-white-50">
                © {new Date().getFullYear()} Book Reviews Inc. All rights reserved.
            </small>
        </footer>
    );
}
