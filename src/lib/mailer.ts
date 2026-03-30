import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(toEmail: string, resetUrl: string) {
  await resend.emails.send({
    from: 'Palio d\'Urmon <onboarding@resend.dev>',
    to: toEmail,
    subject: "Reset della tua password — Palio d'Urmon",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 32px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <img src="${process.env.NEXT_PUBLIC_APP_URL}/icon-192.png" alt="Palio d'Urmon" style="width: 64px; margin-bottom: 16px;" />
        <h2 style="color: #1a1a1a;">Reset Password</h2>
        <p style="color: #444;">Hai richiesto di reimpostare la password per il tuo account su <strong>Palio d'Urmon</strong>.</p>
        <p style="color: #444;">Clicca il pulsante qui sotto. Il link è valido per <strong>1 ora</strong>.</p>
        <a href="${resetUrl}" style="display:inline-block; margin: 24px 0; padding: 12px 28px; background-color: #b91c1c; color: white; border-radius: 8px; text-decoration: none; font-weight: bold;">
          Reimposta Password
        </a>
        <p style="color: #888; font-size: 13px;">Se non hai fatto questa richiesta, ignora questa mail. La tua password non cambierà.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #bbb; font-size: 12px;">Palio d'Urmon — Robbio</p>
      </div>
    `,
  });
}