import { profile } from "../data/resume";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 text-center">
      <p className="font-mono text-xs text-fog">
        Designed &amp; built by {profile.name} · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
