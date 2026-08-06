<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { contactEmail, contactLinks } from '../data/portfolio'
import { vReveal } from '../directives/reveal'
import { lang } from '../composables/useLang'

const FORM_ENDPOINT = 'https://formspree.io/f/xdenowlj'

const copy = {
  sv: {
    eyebrow: 'kontakt',
    title: 'Redo för nästa projekt',
    intro: 'Hör av dig om du har en tjänst, ett projekt eller bara vill snacka kod. Jag svarar oftast inom ett par dagar.',
    copied: 'Kopierat ✓',
    nameLabel: 'namn',
    namePlaceholder: 'Ditt namn',
    emailLabel: 'e-post',
    emailPlaceholder: 'din@epost.se',
    messageLabel: 'meddelande',
    messagePlaceholder: 'Berätta om tjänsten...',
    send: 'Skicka meddelande',
    sending: 'Skickar...',
    sent: 'Skickat ✓',
    error: 'Något gick fel. Testa igen, eller mejla mig direkt på',
  },
  en: {
    eyebrow: 'contact',
    title: 'Ready for the next project',
    intro: "Reach out if you have a role, a project, or just want to talk code. I usually reply within a couple of days.",
    copied: 'Copied ✓',
    nameLabel: 'name',
    namePlaceholder: 'Your name',
    emailLabel: 'email',
    emailPlaceholder: 'you@email.com',
    messageLabel: 'message',
    messagePlaceholder: 'Tell me about the opportunity...',
    send: 'Send message',
    sending: 'Sending...',
    sent: 'Sent ✓',
    error: 'Something went wrong. Try again, or email me directly at',
  },
}

const t = computed(() => copy[lang.value])

const submitting = ref(false)
const submitted = ref(false)
const submitError = ref(false)
const emailCopied = ref(false)
let copyResetTimeout: ReturnType<typeof setTimeout> | undefined

const form = reactive({
  name: '',
  email: '',
  message: '',
})

async function handleSubmit() {
  submitting.value = true
  submitError.value = false
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) throw new Error('Formspree request failed')
    submitted.value = true
    form.name = ''
    form.email = ''
    form.message = ''
  } catch {
    submitError.value = true
  } finally {
    submitting.value = false
  }
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(contactEmail)
    emailCopied.value = true
    clearTimeout(copyResetTimeout)
    copyResetTimeout = setTimeout(() => (emailCopied.value = false), 1800)
  } catch {
    // clipboard permission denied or unavailable — silently ignore
  }
}
</script>

<template>
  <section id="contact" class="contact divider">
    <div class="eyebrow">{{ t.eyebrow }}</div>
    <div class="grid">
      <div v-reveal>
        <h2>{{ t.title }}</h2>
        <p>{{ t.intro }}</p>
        <div class="links">
          <button type="button" class="copy-email" @click="copyEmail">
            {{ emailCopied ? t.copied : contactEmail }}
          </button>
          <a
            v-for="link in contactLinks"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            >{{ link.label }}</a
          >
        </div>
      </div>
      <form @submit.prevent="handleSubmit" v-reveal="120">
        <div class="field">
          <label for="contact-name">{{ t.nameLabel }}</label>
          <input id="contact-name" v-model="form.name" type="text" :placeholder="t.namePlaceholder" />
        </div>
        <div class="field">
          <label for="contact-email">{{ t.emailLabel }}</label>
          <input id="contact-email" v-model="form.email" type="email" :placeholder="t.emailPlaceholder" />
        </div>
        <div class="field">
          <label for="contact-message">{{ t.messageLabel }}</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            :placeholder="t.messagePlaceholder"
            rows="5"
          ></textarea>
        </div>
        <button type="submit" :disabled="submitting || submitted">
          {{ submitted ? t.sent : submitting ? t.sending : t.send }}
        </button>
        <p v-if="submitError" class="form-error">{{ t.error }} {{ contactEmail }}.</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: 120px 48px 140px 48px;
  max-width: 1100px;
  margin: 0 auto;
}

.eyebrow {
  margin-bottom: 16px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
}

h2 {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0 0 24px 0;
  color: var(--ink);
  line-height: 1;
}

p {
  font-size: 16.5px;
  line-height: 1.75;
  color: var(--ink-muted);
  margin: 0 0 32px 0;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: var(--font-mono);
  font-size: 14.5px;
}

.copy-email {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: var(--accent);
  text-align: left;
  cursor: pointer;
  transition: color 0.2s;
}

.copy-email:hover {
  color: var(--accent-strong);
}

form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

input,
textarea {
  background: var(--surface-raised);
  border: 1.5px solid var(--border-strong);
  border-radius: 3px;
  padding: 13px 15px;
  color: var(--ink);
  font-size: 15px;
  font-family: var(--font-sans);
}

textarea {
  resize: vertical;
}

button {
  background: var(--accent);
  color: var(--bg);
  border: none;
  padding: 14px 26px;
  border-radius: 3px;
  font-family: var(--font-mono);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition:
    filter 0.2s,
    transform 0.2s;
}

button:hover {
  filter: brightness(1.08);
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.7;
  cursor: default;
  transform: none;
}

.form-error {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  button:hover {
    transform: none;
  }
}

@media (max-width: 900px) {
  .contact {
    padding: 80px 24px 96px 24px;
  }

  h2 {
    font-size: 30px;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}
</style>
