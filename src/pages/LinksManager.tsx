import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PlusCircle, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface Link {
  id: string;
  name: string;
  url: string;
  description: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export default function LinksManager() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [newLink, setNewLink] = useState({
    name: '',
    url: '',
    description: '',
    active: true
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks() {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddLink(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('links')
        .insert([newLink]);

      if (error) throw error;

      setNewLink({
        name: '',
        url: '',
        description: '',
        active: true
      });

      fetchLinks();
    } catch (error) {
      console.error('Error adding link:', error);
    }
  }

  async function handleUpdateLink(e: React.FormEvent) {
    e.preventDefault();
    if (!editingLink) return;

    try {
      const { error } = await supabase
        .from('links')
        .update({
          name: editingLink.name,
          url: editingLink.url,
          description: editingLink.description,
          active: editingLink.active
        })
        .eq('id', editingLink.id);

      if (error) throw error;

      setEditingLink(null);
      fetchLinks();
    } catch (error) {
      console.error('Error updating link:', error);
    }
  }

  async function handleDeleteLink(id: string) {
    if (!confirm('Are you sure you want to delete this link?')) return;

    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchLinks();
    } catch (error) {
      console.error('Error deleting link:', error);
    }
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
        <h1 className="text-2xl font-bold mb-8">Gerenciar Links</h1>

        {/* Add new link form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Adicionar Novo Link</h2>
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
              <label className="block text-sm font-medium text-gray-700">URL</label>
              <input
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                value={newLink.description}
                onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                rows={3}
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
              Adicionar Link
            </button>
          </form>
        </div>

        {/* Links list */}
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
                      <label className="block text-sm font-medium text-gray-700">URL</label>
                      <input
                        type="url"
                        value={editingLink.url}
                        onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Descrição</label>
                      <textarea
                        value={editingLink.description || ''}
                        onChange={(e) => setEditingLink({ ...editingLink, description: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        rows={3}
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
                    <p className="text-sm text-gray-600 mt-1">{link.url}</p>
                    {link.description && (
                      <p className="text-sm text-gray-500 mt-2">{link.description}</p>
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