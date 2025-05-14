import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PlusCircle, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface PaymentLink {
  id: string;
  name: string;
  amount: number;
  currency: string;
  active: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function PaymentLinks() {
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState<PaymentLink | null>(null);
  const [newLink, setNewLink] = useState({
    name: '',
    amount: 0,
    currency: 'BRL',
    active: true,
    expires_at: null as string | null
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks() {
    try {
      const { data, error } = await supabase
        .from('payment_links')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching payment links:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddLink(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('payment_links')
        .insert([newLink]);

      if (error) throw error;

      setNewLink({
        name: '',
        amount: 0,
        currency: 'BRL',
        active: true,
        expires_at: null
      });

      fetchLinks();
    } catch (error) {
      console.error('Error adding payment link:', error);
    }
  }

  async function handleUpdateLink(e: React.FormEvent) {
    e.preventDefault();
    if (!editingLink) return;

    try {
      const { error } = await supabase
        .from('payment_links')
        .update({
          name: editingLink.name,
          amount: editingLink.amount,
          currency: editingLink.currency,
          active: editingLink.active,
          expires_at: editingLink.expires_at
        })
        .eq('id', editingLink.id);

      if (error) throw error;

      setEditingLink(null);
      fetchLinks();
    } catch (error) {
      console.error('Error updating payment link:', error);
    }
  }

  async function handleDeleteLink(id: string) {
    if (!confirm('Are you sure you want to delete this payment link?')) return;

    try {
      const { error } = await supabase
        .from('payment_links')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchLinks();
    } catch (error) {
      console.error('Error deleting payment link:', error);
    }
  }

  function copyPaymentLink(id: string) {
    const link = `${window.location.origin}/payment/${id}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Links de Pagamento</h1>

        {/* Add new payment link form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Criar Novo Link</h2>
          <form onSubmit={handleAddLink} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                value={newLink.name}
                onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valor</label>
              <input
                type="number"
                step="0.01"
                value={newLink.amount}
                onChange={(e) => setNewLink({ ...newLink, amount: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Data de Expiração</label>
              <input
                type="datetime-local"
                value={newLink.expires_at || ''}
                onChange={(e) => setNewLink({ ...newLink, expires_at: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={newLink.active}
                onChange={(e) => setNewLink({ ...newLink, active: e.target.checked })}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label className="ml-2 text-sm text-gray-700">Ativo</label>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
            >
              <PlusCircle size={20} className="mr-2" />
              Criar Link
            </button>
          </form>
        </div>

        {/* Payment links list */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Links Existentes</h2>
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.id} className="border rounded-lg p-4">
                {editingLink?.id === link.id ? (
                  <form onSubmit={handleUpdateLink} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nome</label>
                      <input
                        type="text"
                        value={editingLink.name}
                        onChange={(e) => setEditingLink({ ...editingLink, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Valor</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editingLink.amount}
                        onChange={(e) => setEditingLink({ ...editingLink, amount: parseFloat(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Data de Expiração</label>
                      <input
                        type="datetime-local"
                        value={editingLink.expires_at || ''}
                        onChange={(e) => setEditingLink({ ...editingLink, expires_at: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingLink.active}
                        onChange={(e) => setEditingLink({ ...editingLink, active: e.target.checked })}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">Ativo</label>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
                      >
                        <CheckCircle size={20} className="mr-2" />
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingLink(null)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center"
                      >
                        <XCircle size={20} className="mr-2" />
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{link.name}</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyPaymentLink(link.id)}
                          className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md border border-blue-600 hover:border-blue-800 text-sm"
                        >
                          Copiar Link
                        </button>
                        <button
                          onClick={() => setEditingLink(link)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteLink(link.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 mt-2">
                      {link.amount.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: link.currency
                      })}
                    </p>
                    {link.expires_at && (
                      <p className="text-sm text-gray-500 mt-1">
                        Expira em: {new Date(link.expires_at).toLocaleString()}
                      </p>
                    )}
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          link.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {link.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}