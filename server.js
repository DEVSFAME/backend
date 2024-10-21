const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route pour envoyer un email
app.post('/send-confirmation', async (req, res) => {
  const { email, fullName, service, date, slot } = req.body;

  // Configurer Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // ou un autre service mail comme Outlook, Yahoo
    auth: {
      user: process.env.EMAIL_USER, // Email que vous allez utiliser
      pass: process.env.EMAIL_PASS, // Mot de passe de l'email
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmation de votre réservation',
    text: `Bonjour ${fullName},\n\nVotre rendez-vous pour le service ${service} a été réservé pour le ${date} à ${slot}.\n\nCordialement,\nL'équipe.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email envoyé avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).send('Erreur lors de l\'envoi de l\'email.');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur backend en cours d'exécution sur le port ${PORT}`);
});
