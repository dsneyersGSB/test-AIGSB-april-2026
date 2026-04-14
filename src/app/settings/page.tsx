import SettingsForm from '@/components/SettingsForm';

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Personalize your interview practice. Questions and feedback will be tailored to your background.
        </p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <SettingsForm />
      </div>
    </div>
  );
}
