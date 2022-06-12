import { Route, Routes, Navigate } from 'react-router-dom'
import pages from './pages'
import PrivateRoute from './components/PrivateRoute'

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><pages.Home /></PrivateRoute>} />
      <Route path="/auth/login" element={<pages.Login />} />
      <Route path="/auth/register" element={<pages.Register />} />
      <Route path="/auth/logout" element={<PrivateRoute><pages.Logout /></PrivateRoute>} />
      <Route path="/auth/forgot" element={<pages.Forgot />} />
      <Route path="/info/terms" element={<pages.Terms />} />
      <Route path="/info/privacy" element={<pages.PrivacyPolicy />} />
      <Route path="/info/responsible-gambling" element={<pages.ResponsibleGambling />} />
      <Route path="/info/refund-policy" element={<pages.RefundPolicy />} />
      <Route path="/info/imprint" element={<pages.Imprint />} />
      <Route path="/help/faq" element={<pages.FAQ />} />
      <Route path="/help/contact" element={<pages.Contact />} />
      <Route path="/play" element={<PrivateRoute><pages.Play /></PrivateRoute>} />
      <Route path="/myaccount" element={<PrivateRoute><pages.Menu /></PrivateRoute>} />
      <Route path="/myaccount/deposit" element={<PrivateRoute><pages.Deposit /></PrivateRoute>} />
      <Route path="/myaccount/withdraw" element={<PrivateRoute><pages.Withdraw /></PrivateRoute>} />
      <Route path="/myaccount/charts" element={<PrivateRoute><pages.WinLossChart /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
